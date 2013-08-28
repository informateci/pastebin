from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 4
_modified_time = 1282960047.8004739
_template_filename='/var/www/pastebin/pastebin/templates/raw.mako'
_template_uri='/raw.mako'
_template_cache=cache.Cache(__name__, _modified_time)
_source_encoding=None
_exports = []


def render_body(context,**pageargs):
    context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        c = context.get('c', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'<!DOCTYPE html>\n<html>\n   <head>\n   </head>\n   <body>\n      <pre>\n')
        # SOURCE LINE 7
        if c.raw:
            # SOURCE LINE 8
            __M_writer(filters.html_escape(unicode(c.raw )))
            __M_writer(u'\n')
        # SOURCE LINE 10
        __M_writer(u'      </pre>\n   </body>\n</html>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


