#!/bin/sh

echo "host    all             all             0.0.0.0/0        md5" >> /var/lib/postgresql/data/pg_hba.conf
echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf
