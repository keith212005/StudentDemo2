import {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);

var database_name = 'StudentDemo.db';

var db = SQLite.openDatabase(
  {
    name: database_name,
    createFromLocation: 1,
    location: 'default',
  },
  () => console.log('Database open success'),
  e => console.log('Database open fail', e),
);

class SQLiteDemo extends Component {
  queryTodos = () => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery('select * from todos', []).then(result => {
        console.log(typeof result.rows);
        console.log(result.rows.length);
        var resultObject = [];
        for (let i = 0; i < result.rows.length; i++) {
          resultObject.push(result.rows.item(i));
          console.log('item>>>>>', result.rows.item(i));
        }
        resolve(resultObject);
      });
    });
  };

  addTodo = (sql, arrValues) => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery(sql, arrValues).then(result => {
        resolve(result);
      });
    });
  };

  deleteTodo = id => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery('delete from todos where id=?', [id]).then(result => {
        resolve(result);
      });
    });
  };

  ExecuteQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      console.log('inside ExecurtqQuery');
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => resolve(results),
          error => reject(error),
        );
      });
    });
  };

  initTables = () => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery(
        'CREATE TABLE IF NOT EXISTS Todos( ' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
          'title VARCHAR(300), ' +
          'isCompleted BOOLEAN ); ',
      ).then(
        result => {
          // this.insertIntoTodos();
          resolve();
        },
        error => reject(),
      );
    });
  };

  // insertIntoTodos() {
  //   this.ExecuteQuery(
  //     'INSERT INTO Todos (title,isCompleted) VALUES ("Messageing ",true)',
  //   );
  //   this.ExecuteQuery(
  //     'INSERT INTO Todos (title,isCompleted) VALUES (" Services",false)',
  //   );
  // }

  closeDatabase = () => {
    if (db) {
      console.log('Closing database ...');
      db.close()
        .then(status => console.log('Database CLOSED'))
        .catch(error => this.errorCB(error));
    } else {
      console.log('Database was not OPENED');
    }
  };

  deleteDatabase = () => {
    console.log('Deleting database');
    SQLite.deleteDatabase(database_name);
  };
}

export const DB = new SQLiteDemo();
