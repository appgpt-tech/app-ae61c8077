//Source code generated by AppGPT (www.appgpt.tech)

//Class to create tables and seed new database
import { DataSource } from 'typeorm';
import { DBConfiguration } from './Configuration';
import { SettingsEntity } from './db/Settings.entity';
//autogenerate imports based on resources
import { StudyMaterialsEntity } from './db/StudyMaterials.entity';

export class Database {
  static dbConfiguration: DBConfiguration;
  public static ds: DataSource;

  static async Initialize(dbConfiguration: DBConfiguration) {
    Database.dbConfiguration = dbConfiguration;
    let dbConfig: any = dbConfiguration as any;
    //Autogenerate entities array from resource names

    dbConfig.entities = [SettingsEntity, StudyMaterialsEntity];
    Database.ds = new DataSource(dbConfig);
    await Database.ds.initialize();

    //TODO: Drop all tables

    await Database.Seed();
  }
  static async Seed() {
    let data: any = {
      StudyMaterials: [
        {
          title: 'title 1',
          description: 'description 1',
          uploadDate: '2023-06-30T23:38:51.334Z',
          fileLink: 'fileLink 1',
          id: 43,
        },
        {
          title: 'title 2',
          description: 'description 2',
          uploadDate: '2024-06-29T01:00:30.471Z',
          fileLink: 'fileLink 2',
          id: 56,
        },
        {
          title: 'title 3',
          description: 'description 3',
          uploadDate: '2025-03-04T04:03:10.070Z',
          fileLink: 'fileLink 3',
          id: 36,
        },
        {
          title: 'title 4',
          description: 'description 4',
          uploadDate: '2024-12-10T07:42:32.451Z',
          fileLink: 'fileLink 4',
          id: 56,
        },
        {
          title: 'title 5',
          description: 'description 5',
          uploadDate: '2024-09-26T04:57:49.944Z',
          fileLink: 'fileLink 5',
          id: 3,
        },
      ],
    };
    //Autogenerate multiple such calls ie for each resource and its data object
    let isSeeded = await this.IsSeeded();
    //if (!isSeeded) {
    //forcing app recreation
    if (true) {
      console.log('   Seeding database...');
      await this.SeedResource('StudyMaterialsEntity', data.StudyMaterials);
      await this.SeedResource('SettingsEntity', {
        settingname: 'isSeeded',
        settingvalue: 'true',
      });
    } else {
      console.log('   Database seeded already!');
    }
  }
  static async IsSeeded() {
    const repo = Database.ds.getRepository('SettingsEntity');
    let rec: any = await repo.findOne({
      select: {
        settingname: true,
        settingvalue: true,
      },
      where: {
        settingname: 'isSeeded',
      },
    });
    if (rec && rec.settingvalue) return true;
    return false;
  }
  static async SeedResource(resourceName: any, resourceData: any) {
    const repo = Database.ds.getRepository(resourceName);
    //await repo.clear();
    console.log('   Seeding table ' + resourceName);
    await repo.upsert(resourceData, ['id']);
  }
}
