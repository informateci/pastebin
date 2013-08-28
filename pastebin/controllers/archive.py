import logging
import pastebin.model
from sqlalchemy.sql.expression import desc
from datetime import datetime
from pastebin.lib.base import *
from webhelpers.paginate import Page

log = logging.getLogger(__name__)

class ArchiveController(BaseController):

    def index(self, id=1):
        c.now = datetime.now()
        query = model.meta.Session.query(model.Snippet)
        c.lastsnippets = query.order_by(desc(model.Snippet.creation)).limit(5)
        c.page = Page(query.order_by(desc(model.Snippet.creation)), id or 1, items_per_page=10)
        return render('/archive.mako')
