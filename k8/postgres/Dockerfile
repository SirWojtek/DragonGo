FROM postgres:11

ENV POSTGIS_MAJOR 2.5

RUN apt-get update \
      && apt-get install -y --no-install-recommends \
           postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
           postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts \
           postgis \
      && rm -rf /var/lib/apt/lists/*

COPY ./init-pg-hba.sh /docker-entrypoint-initdb.d/init-pg-hba.sh

EXPOSE 5432

