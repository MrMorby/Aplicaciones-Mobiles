import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database!: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.initDB();
  }

  // Inicializar la base de datos
  private initDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'usuarios.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createTables();
      })
      .catch(e => console.error('Error al crear la base de datos', e));
    });
  }

  // Crear tabla de usuarios
  private createTables() {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT,
        contrasena TEXT
      );
    `;
    this.database.executeSql(sql, [])
      .then(() => console.log('Tabla "usuarios" creada'))
      .catch(e => console.error('Error al crear la tabla', e));
  }

  // Crear un nuevo usuario
  public addUsuario(nombre: string, correo: string, contrasena: string) {
    const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
    return this.database.executeSql(sql, [nombre, correo, contrasena]);
  }

  // Obtener todos los usuarios
  public getUsuarios() {
    const sql = 'SELECT * FROM usuarios';
    return this.database.executeSql(sql, []).then((result) => {
      let usuarios = [];
      for (let i = 0; i < result.rows.length; i++) {
        usuarios.push(result.rows.item(i));
      }
      return usuarios;
    });
  }

  // Actualizar un usuario por ID
  public updateUsuario(id: number, nombre: string, correo: string, contrasena: string) {
    const sql = 'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?';
    return this.database.executeSql(sql, [nombre, correo, contrasena, id]);
  }

  // Eliminar un usuario por ID
  public deleteUsuario(id: number) {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    return this.database.executeSql(sql, [id]);
  }
}
