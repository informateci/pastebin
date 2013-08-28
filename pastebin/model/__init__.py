import sqlalchemy as sa
from sqlalchemy import orm
import logging
from sqlalchemy.orm import scoped_session, sessionmaker

from pastebin.model import meta

log = logging.getLogger(__name__)

#def init_model(engine):
#   meta.Session.configure(bind=engine)
#   meta.engine = engine
def init_model(eng):
    """Call me before using any of the tables or classes in the model"""

    sm = sessionmaker(autoflush=True, transactional=True, bind=eng)
    meta.Session = scoped_session(sm)

    meta.engine = eng
    log.info("init_model %s %s" % (meta.engine, eng))
    meta.Session.configure(bind=eng)


snippet_table = sa.Table("snippet", meta.metadata,
   sa.Column("id", sa.types.String(8), primary_key=True),
   sa.Column("code", sa.types.UnicodeText()),
   sa.Column("codeformatted", sa.types.UnicodeText()),
   sa.Column("highlight", sa.types.String(128)),
   sa.Column("creation", sa.types.DateTime),
   sa.Column("expiration", sa.types.DateTime),
   sa.Column("title", sa.types.String(255)),
   sa.Column("username", sa.types.String(128))
)

class Snippet(object):
   pass

orm.mapper(Snippet, snippet_table)
