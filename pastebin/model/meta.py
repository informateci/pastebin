### model/meta.py

"""SQLAlchemy Metadata and Session object"""
from sqlalchemy import MetaData
import logging

# SQLAlchemy database engine.  Updated by model.init_model()
engine = None

# SQLAlchemy session manager.  Updated by model.init_model()
Session = None

# Global metadata. If you have multiple databases with overlapping table
# names, you'll need a metadata for each database
metadata = MetaData()

__all__ = ['engine', 'Session', 'metadata']


