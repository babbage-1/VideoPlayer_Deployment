const { Pool } = require('pg');
const { config } = require('../postgres.config.js');
const pool = new Pool(config);


(async () => {

  const client = await pool.connect()

  try {
    console.time('timing seed');

    await client.query('BEGIN');

    await client.query(`DROP TABLE IF EXISTS videos;`);
    await client.query(`DROP TABLE IF EXISTS associatedVideos;`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS videos(
        name VARCHAR(50) NOT NULL,
        url VARCHAR(100) NOT NULL
        );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS associatedVideos(
        id INT NOT NULL,
        associatedId INT NOT NULL
        );
    `);

    console.log('writing to database!');


    const envyVideosPath = '/var/lib/pgsql92/VideosData.csv';
    const envyAssociatedPath = '/var/lib/pgsql92/AssociatedData.csv';

    // const videosPath = '/Users/aysun/Documents/hr/video-player-and-carousel/server/db/data/csv/VideosData.csv';
    // const associatedPath = '/Users/aysun/Documents/hr/video-player-and-carousel/server/db/data/csv/AssociatedData.csv';

    await client.query(`
      COPY videos FROM '${envyVideosPath}' WITH (FORMAT CSV, HEADER, DELIMITER('|'))
    `);

    await client.query(`
      COPY associatedVideos FROM '${envyAssociatedPath}' WITH (FORMAT CSV, HEADER, DELIMITER('|'))
    `);

    await client.query(`
      ALTER TABLE videos ADD COLUMN id SERIAL PRIMARY KEY;
    `);

    await client.query(`
      CREATE INDEX ON associatedVideos (id);
    `);

    await client.query('COMMIT');

    console.timeEnd('timing seed');

  } catch (e) {
    await client.query('ROLLBACK');
    console.log('error!');
    throw e;
  } finally {
    client.release();
  }
})().catch(e => console.error(e.stack));



