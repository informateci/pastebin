"""Setup the pastebin application"""
import logging

from paste.deploy import appconfig
from pylons import config
from pastebin.model import meta 

from pastebin.config.environment import load_environment

log = logging.getLogger(__name__)

def setup_config(command, filename, section, vars):
    """Place any commands to setup pastebin here"""
    conf = appconfig('config:' + filename)
    load_environment(conf.global_conf, conf.local_conf)
    log.info("Creating tables %s" % meta.engine)
    meta.metadata.drop_all(bind=meta.engine, checkfirst=True)
    meta.metadata.create_all(bind=meta.engine)
    log.info("Successfully setup")

