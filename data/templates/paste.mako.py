from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 4
_modified_time = 1285953406.4715919
_template_filename='/var/www/pastebin/pastebin/templates/paste.mako'
_template_uri='/paste.mako'
_template_cache=cache.Cache(__name__, _modified_time)
_source_encoding=None
_exports = ['content']


def _mako_get_namespace(context, name):
    try:
        return context.namespaces[(__name__, name)]
    except KeyError:
        _mako_generate_namespaces(context)
        return context.namespaces[(__name__, name)]
def _mako_generate_namespaces(context):
    pass
def _mako_inherit(template, context):
    _mako_generate_namespaces(context)
    return runtime._inherit_from(context, u'base.mako', _template_uri)
def render_body(context,**pageargs):
    context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'\n')
        # SOURCE LINE 54
        __M_writer(u'\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content(context):
    context.caller_stack._push_frame()
    try:
        c = context.get('c', UNDEFINED)
        request = context.get('request', UNDEFINED)
        _ = context.get('_', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer(u'\n')
        # SOURCE LINE 3
        if c.snippet.code:
            # SOURCE LINE 4
            __M_writer(u'      <h2>')
            __M_writer(unicode(c.snippet.title))
            __M_writer(u'</h2>\n      <ul id="abstract">\n         <li>')
            # SOURCE LINE 6
            __M_writer(unicode(_("Syntax")))
            __M_writer(u': ')
            __M_writer(unicode(c.snippet.highlight))
            __M_writer(u'</li>\n         <li>')
            # SOURCE LINE 7
            __M_writer(unicode(_("Author")))
            __M_writer(u': ')
            __M_writer(unicode(c.snippet.username))
            __M_writer(u'</li>\n         <li>')
            # SOURCE LINE 8
            __M_writer(unicode(c.snippet.creation))
            __M_writer(u'</li>\n         <li class="action"><a href="/')
            # SOURCE LINE 9
            __M_writer(unicode(c.snippet.id))
            __M_writer(u'/raw">raw</a></li>\n      </ul>\n')
            # SOURCE LINE 11
            if c.snippet.codeformatted:
                # SOURCE LINE 12
                __M_writer(u'      ')
                __M_writer(unicode(c.snippet.codeformatted ))
                __M_writer(u'\n')
                # SOURCE LINE 13
            else:
                # SOURCE LINE 14
                __M_writer(u'      <ol id="cookedcode">\n')
                # SOURCE LINE 15
                for i in c.snippet.code.split('\n'):
                    # SOURCE LINE 16
                    __M_writer(u'         <li>')
                    __M_writer(filters.html_escape(unicode(i )))
                    __M_writer(u'</li>\n')
                # SOURCE LINE 18
                __M_writer(u'      </ol>\n')
        # SOURCE LINE 21
        __M_writer(u'   <form action="/post" method="POST" id="pasteform">\n      <input type="hidden" name="form.submitted" value="1"/>\n')
        # SOURCE LINE 23
        if c.snippet.id:
            # SOURCE LINE 24
            __M_writer(u'      <input type="hidden" name="id" value="')
            __M_writer(unicode(c.snippet.id))
            __M_writer(u'"/>\n')
        # SOURCE LINE 26
        __M_writer(u'      <label for="code">')
        __M_writer(unicode(_("Code snippet")))
        __M_writer(u':</label>\n      <textarea id="code" name="code">')
        # SOURCE LINE 27
        __M_writer(unicode(c.snippet.code))
        __M_writer(u'</textarea>\n      <div class="formfield">\n         <label for="highlight">')
        # SOURCE LINE 29
        __M_writer(unicode(_("Syntax highlight")))
        __M_writer(u':</label>\n         <select id="highlight" name="highlight">\n')
        # SOURCE LINE 31
        for i in [(_("Guess"), ('000-GUESS',))] + c.highlight:
            # SOURCE LINE 32
            __M_writer(u'            <option value="')
            __M_writer(unicode(i[1][0]))
            __M_writer(u'" ')
            __M_writer(unicode(('highlight' in request.POST and request.POST['highlight'] == i[1][0] or c.snippet.highlight == i[1][0]) and 'selected' ))
            __M_writer(u'>')
            __M_writer(unicode(i[0]))
            __M_writer(u'</option>\n')
        # SOURCE LINE 34
        __M_writer(u'         </select>\n      </div>\n      <div class="formfield">\n      <label for="expiration">')
        # SOURCE LINE 37
        __M_writer(unicode(_("Post expiration")))
        __M_writer(u':</label>\n         <select id="expiration" name="expiration">\n')
        # SOURCE LINE 39
        for k,v in {"Never (ARE YOU SURE?)": -1, "10 Minutes": 600, "1 Hour": 3600, "1 Day": 86400, "1 Month": 2592000}.items():
            # SOURCE LINE 40
            __M_writer(u'            <option value="')
            __M_writer(unicode(v))
            __M_writer(u'">')
            __M_writer(unicode(_(k)))
            __M_writer(u'</option>\n')
        # SOURCE LINE 42
        __M_writer(u'      </select>\n      </div>\n      <div class="formfield">\n         <label for="title">')
        # SOURCE LINE 45
        __M_writer(unicode(_("Title")))
        __M_writer(u':</label>\n         <input type="text" id="title" name="title" value="')
        # SOURCE LINE 46
        __M_writer(unicode(('title' in request.POST and request.POST['title']) or c.snippet.title))
        __M_writer(u'"/>\n      </div>\n      <div class="formfield">\n         <label for="username">')
        # SOURCE LINE 49
        __M_writer(unicode(_("Username")))
        __M_writer(u':</label>\n         <input type="text" id="username" name="username" value="')
        # SOURCE LINE 50
        __M_writer(unicode(('username' in request.POST and request.POST['username']) or c.snippet.username))
        __M_writer(u'"/>\n         <input type="submit" value="')
        # SOURCE LINE 51
        __M_writer(unicode(_('Paste!')))
        __M_writer(u'"/>\n      </div>\n   </form> \n')
        return ''
    finally:
        context.caller_stack._pop_frame()


