from pastebin.lib.base import *
from pastebin.lib.codeformatter import CodeFormatter
import pastebin.model
from pylons import request, response, session, c 
from pylons.controllers.util import abort, redirect_to
from sqlalchemy.sql.expression import desc
from pygments import highlight
from pygments.lexers import get_all_lexers, get_lexer_by_name, guess_lexer
from formencode.validators import UnicodeString, String
from formencode.api import Invalid
from time import time
from datetime import datetime
from hashlib import sha1

# CREATE TABLE snippet (
#    id VARCHAR(8) NOT NULL, 
#    code TEXT, 
#    highlight VARCHAR(128), 
#    creation TIMESTAMP,
#    expiration TIMESTAMP, 
#    title VARCHAR(255), 
#    username VARCHAR(128), 
#    PRIMARY KEY (id)
# );

class FooSnippet():
    def __init__(self):
       self.id = ''
       self.code = ''
       self.codeformatted = ''
       self.highlight = ''
       self.creation = ''
       self.expiration = ''
       self.title = ''
       self.username = ''

 
class PasteController(BaseController):

    def view(self, id, errors=None):
       """ default pastebin view """

       c.highlight = [l for l in get_all_lexers()]
       c.highlight.sort()
       c.now = datetime.now()

       query = model.meta.Session.query(model.Snippet)
       c.lastsnippets = query.order_by(desc(model.Snippet.creation)).limit(5)
       if id:
           c.snippet = query.get(id) or FooSnippet()
       elif 'id' in request.POST:
           c.snippet = query.get(request.POST['id']) or FooSnippet()
       else:
           c.snippet = FooSnippet()
       if errors :
           c.errors = errors
       else :
           c.errors = {}

       return render("/paste.mako")

    def raw(self, id):
       """ Raw Pastebin """

       query = model.meta.Session.query(model.Snippet)
       if id:
           snippet = query.get(id)
           if snippet:
               c.raw = snippet.code
               return render("/raw.mako")
       abort(404)

    def post(self):
       """ form post action (new snippet) """

       snippet = model.Snippet()
       post = request.POST
       errors = {} # just in case of a better error verification
       try:
           snippet.code = UnicodeString().to_python(post['code'])
           if not snippet.code:
               errors["code"] = "Required field"
       except Invalid, e:
           errors["code"] = "Required field"
       try:
           snippet.highlight = String().to_python(post['highlight'])
       except Invalid, e:
           pass
       snippet.creation = datetime.now()
       if int(post['expiration']) > 0:
         snippet.expiration = datetime.fromtimestamp(time() + int(post['expiration']))
       else:
         snippet.expiration = snippet.creation 
       try:
           snippet.title = String(max=255).to_python(post['title'])
           if not snippet.title:
               snippet.title = "Anonymous code"
       except Invalid, e:
           snippet.title = "Anonymous code"
       try:
           snippet.username = String(max=128).to_python(post['username'])
           if not snippet.username:
               snippet.username = "Anonymous coward"
       except Invalid, e:
           snippet.title = "Anonymous coward" # slashdot <3
       if errors:
           return self.view(None, errors)

       if snippet.highlight != "000-GUESS":
           snippet.codeformatted = highlight(snippet.code, get_lexer_by_name(snippet.highlight.lower()), CodeFormatter())
       else:
           try:
               snippet.codeformatted = highlight(snippet.code, guess_lexer(snippet.code), CodeFormatter())
           except:
               snippet.codeformatted = highlight(snippet.code, get_lexer_by_name('text'), CodeFormatter())

       sha = sha1(snippet.code.encode("utf-8") + str(time())).hexdigest()
       query = model.meta.Session.query(model.Snippet)
       for i in range(0, 40, 8):
           if not query.get(sha[i:i+8]):
               snippet.id = sha[i:i+8]

       model.meta.Session.add(snippet)
       model.meta.Session.commit()

       redirect_to(controller="paste", action="view", id=snippet.id)
