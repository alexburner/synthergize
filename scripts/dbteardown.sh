#!/bin/bash

## ADD ROOT USER, CREATE SYNTHERGIZEDB DATABASE, GRANT ALL PRIVILEGES
psql -h localhost << EOF
DROP DATABASE learntogether;
DROP USER root;
\q
EOF