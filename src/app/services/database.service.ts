import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // Atributos

  // Observable para comprobar si la base de datos esta lista
  public dbReady: BehaviorSubject<boolean>;
  // Indica si estamos en web
  public isWeb: boolean;
  // Indica si estamos en IOS
  public isIOS: boolean;
  // Nombre de la base de datos
  public dbName: string;

  constructor(
    private http: HttpClient
  ) {
    this.dbReady = new BehaviorSubject(false);
    this.isWeb = false;
    this.isIOS = false;
    this.dbName = '';
  }

  async init() {

    const info = await Device.getInfo();
    // CapacitorSQLite no tiene disponible el metodo requestPermissions pero si existe y es llamable
    const sqlite = CapacitorSQLite as any;

    // Si estamos en android, pedimos permiso
    if (info.platform == 'android') {
      try {
        await sqlite.requestPermissions();
      } catch (error) {
        console.error("Esta app necesita permisos para funcionar")
      }
      // Si estamos en web, iniciamos la web store
    } else if (info.platform == 'web') {
      this.isWeb = true;
      await sqlite.initWebStore();
    } else if (info.platform == 'ios') {
      this.isIOS = true;
    }

    // Arrancamos la base de datos
    this.setupDatabase();

  }

  async setupDatabase() {

    // Obtenemos si ya hemos creado la base de datos
    const dbSetup = await Preferences.get({ key: 'first_setup_key' })

    // Sino la hemos creado, descargamos y creamos la base de datos
    if (!dbSetup.value) {
      this.downloadDatabase();
    } else {
      // Nos volvemos a conectar
      this.dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({ database: this.dbName });
      await CapacitorSQLite.open({ database: this.dbName })
      this.dbReady.next(true);
    }

  }

  downloadDatabase() {

    // Obtenemos el fichero assets/db/db.json
    this.http.get('assets/db/db.json').subscribe(async (jsonExport: JsonSQLite) => {


      const jsonstring = JSON.stringify(jsonExport);
      // Validamos el objeto
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

      // Si es valido
      if (isValid.result) {

        // Obtengo el nombre de la base de datos
        this.dbName = jsonExport.database;
        // Lo importo a la base de datos
        await CapacitorSQLite.importFromJson({ jsonstring });
        // Creo y abro una conexion a sqlite
        await CapacitorSQLite.createConnection({ database: this.dbName });
        await CapacitorSQLite.open({ database: this.dbName })

        // Marco que ya hemos descargado la base de datos
        await Preferences.set({ key: 'first_setup_key', value: '1' })
        // Guardo el nombre de la base de datos
        await Preferences.set({ key: 'dbname', value: this.dbName })

        // Indico que la base de datos esta lista
        this.dbReady.next(true);

      }

    })

  }

  async getDbName() {
    if (!this.dbName) {
      const { value } = await Preferences.get({ key: 'dbname' });
      if (value) {
        this.dbName = value;
      }
    }
    return this.dbName;
  }


  // CRUD de usuarios
  async createUser(name: string, email: string, password: string): Promise<number> {
    const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const lastIdSql = 'SELECT id FROM users ORDER BY id DESC LIMIT 1';
    const dbName = await this.getDbName();

    try {
        // Inserta el usuario
        const insertResult = await CapacitorSQLite.executeSet({
            database: dbName,
            set: [
                {
                    statement: insertSql,
                    values: [name, email, password], // Parámetros para la inserción
                },
            ],
        });

        if (this.isWeb) {
            await CapacitorSQLite.saveToStore({ database: dbName });
        }

        // Verifica si hubo cambios en la inserción
        if (insertResult.changes && insertResult.changes.changes > 0) {
            console.log('Registro insertado correctamente:', insertResult.changes);

            // Obtén el ID del último registro insertado
            const lastIdResult = await CapacitorSQLite.query({
                database: dbName,
                statement: lastIdSql,
                values: [], // Arreglo vacío ya que no hay parámetros en la consulta
            });

            console.log('Resultado de last_insert_rowid:', lastIdResult.values);

            if (lastIdResult.values && lastIdResult.values.length > 0) {
                return lastIdResult.values[0].id; // Devuelve el ID
            } else {
                throw new Error('No se pudo obtener el último ID insertado.');
            }
        } else {
            throw new Error('No se realizaron cambios en la base de datos.');
        }
    } catch (error) {
        console.error('Error en createUser:', error);
        throw error;
    }
}

  async readUsers() {
    const sql = 'SELECT * FROM users';
    const dbName = await this.getDbName();
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let users = [];
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      response.values.forEach(user => {
        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password
        });
      });
      return users;
    }).catch(err => Promise.reject(err));
  }

  async updateUser(id: number, name: string, email: string, password: string) {
    const sql = 'UPDATE users SET name=?, email=?, password=? WHERE id=?';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [name, email, password, id]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }

  async deleteUser(id: number) {
    const sql = 'DELETE FROM users WHERE id=?';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [id]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }

  async validateUser(email: string, password: string): Promise<{ isValid: boolean; userId?: number }> {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [email, password]
    }).then((result: capSQLiteValues) => {
      if (result.values.length > 0) {
        // Usuario válido, retorna isValid y el userId
        const userId = result.values[0].id; // Extrae el ID del usuario
        return { isValid: true, userId };
      } else {
        // Usuario no encontrado
        return { isValid: false };
      }
    }).catch(err => {
      console.error('Error validating user', err);
      return { isValid: false };
    });
  }


  async createProduct(name: string, price: number, description: string, image: string, userId: number) {
    const sql = 'INSERT INTO products (name, price, description, image, user_id) VALUES (?, ?, ?, ?, ?)';
    const dbName = await this.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [name, price, description, image, userId]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }

  async readProducts() {
    const sql = `
      SELECT products.id AS productId, products.name AS productName, products.price, products.description,
             products.image, users.name AS sellerName, users.id AS sellerId
      FROM products
      JOIN users ON products.user_id = users.id
    `;
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: []
    }).then((response: capSQLiteValues) => {
      let products = [];
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      response.values.forEach(product => {
        products.push({
          id: product.productId,
          name: product.productName,
          price: product.price,
          description: product.description,
          image: product.image,
          sellerName: product.sellerName,
          sellerId: product.sellerId
        });
      });
      return products;
    }).catch(err => Promise.reject(err));
  }


  async updateProduct(id: number, name: string, price: number, description: string, image: string) {
    const sql = 'UPDATE products SET name=?, price=?, description=?, image=? WHERE id=?';
    const dbName = await this.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [name, price, description, image, id]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }

  async deleteProduct(id: number) {
    const sql = 'DELETE FROM products WHERE id=?';
    const dbName = await this.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [id]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }

  async getUserProducts(userId: number) {
    const sql = 'SELECT * FROM products WHERE user_id = ?';
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [userId]
    }).then((response: capSQLiteValues) => {
      const products = response.values.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image
      }));
      return products;
    }).catch(err => Promise.reject(err));
  }


}
