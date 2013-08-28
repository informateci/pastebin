from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 4
_modified_time = 1283247517.10058
_template_filename='/var/www/pastebin/pastebin/templates/archive.mako'
_template_uri='/archive.mako'
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
        # SOURCE LINE 38
        __M_writer(u'\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content(context):
    context.caller_stack._push_frame()
    try:
        len = context.get('len', UNDEFINED)
        c = context.get('c', UNDEFINED)
        range = context.get('range', UNDEFINED)
        _ = context.get('_', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer(u'\n')
        # SOURCE LINE 3
        if c.page.page_count > 1:
            # SOURCE LINE 4
            __M_writer(u'<ul id="abstract">\n   <li><a href="/archive">')
            # SOURCE LINE 5
            __M_writer(unicode(_("Most recent")))
            __M_writer(u'</a></li>\n')
            # SOURCE LINE 6
            for li in range(c.page.page - 3 > 0 and c.page.page - 3 or 1, c.page.page + 3 <= c.page.last_page and c.page.page + 3 or c.page.last_page):
                # SOURCE LINE 7
                __M_writer(u'   <li><a href="/archive/')
                __M_writer(unicode(li))
                __M_writer(u'">')
                __M_writer(unicode(li))
                __M_writer(u'</a></li>\n')
            # SOURCE LINE 9
            __M_writer(u'   <li><a href="/archive/')
            __M_writer(unicode(c.page.last_page))
            __M_writer(u'">')
            __M_writer(unicode(_("Oldest")))
            __M_writer(u'</a></li>\n</ul>\n')
        # SOURCE LINE 12
        __M_writer(u'<table id="archive">\n   <thead>\n      <th>Name</th>\n      <th>Posted</th>\n      <th>Expires</th>\n      <th>Size</th>\n      <th>Syntax</th>\n   </thead>\n   <tbody>\n')
        # SOURCE LINE 21
        for i in c.page.items:
            # SOURCE LINE 22
            __M_writer(u'      <tr>\n         <td><a href="/')
            # SOURCE LINE 23
            __M_writer(unicode(i.id))
            __M_writer(u'">')
            __M_writer(unicode(i.title))
            __M_writer(u'</a></td>\n         <td>')
            # SOURCE LINE 24
            __M_writer(unicode(i.username))
            __M_writer(u'</td>\n         <td>')
            # SOURCE LINE 25
            __M_writer(unicode(i.creation != i.expiration and i.expiration or _("Never")))
            __M_writer(u'</td>\n         <td>')
            # SOURCE LINE 26
            __M_writer(unicode("%.2f" % (len(i.code)/1024.0)))
            __M_writer(u'KB</td>\n         <td>\n')
            # SOURCE LINE 28
            if i.highlight != '000-GUESS':
                # SOURCE LINE 29
                __M_writer(u'            <a href="http://en.wikipedia.org/w/index.php?title=Special%3ASearch&search=')
                __M_writer(unicode(i.highlight))
                __M_writer(u'+programming+language" rel="nofollow">')
                __M_writer(unicode(i.highlight))
                __M_writer(u'</a>\n')
                # SOURCE LINE 30
            else:
                # SOURCE LINE 31
                __M_writer(u'            ')
                __M_writer(unicode(i.highlight))
                __M_writer(u'\n')
            # SOURCE LINE 33
            __M_writer(u'         </td>\n      </tr>\n')
        # SOURCE LINE 36
        __M_writer(u'   </tbody>\n</table>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


