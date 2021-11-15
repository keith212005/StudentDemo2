import {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';
// SQLite.DEBUG(true);

var database_name = 'StudentDemo.db';

var db = SQLite.openDatabase(
  {
    name: database_name,
    location: 'default',
  },
  () => console.log('Database open success'),
  e => console.log('Database open fail', e),
);

class SQLiteDemo extends Component {
  getTotalTodoCounts = () => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery('select count(1) from todos', []).then(results => {
        resolve(results.rows.item(0)['count(1)']);
      });
    });
  };

  getCompletedTodos = () => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery(
        'select count(*) from todos where isCompleted=1',
        [],
      ).then(results => resolve(results.rows.item(0)['count(*)']));
    });
  };

  getPendingTodos = () => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery(
        'select count(*) from todos where isCompleted=0',
        [],
      ).then(results => resolve(results.rows.item(0)['count(*)']));
    });
  };

  queryTodos = () => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery('select * from todos', []).then(results => {
        console.log('KKKKKKKKKKKKKKKKKKKKKKKK>>>>>>>', results.rows);
        console.log(typeof results.rows.item(0));
        // console.log(result.rows.length);
        var resultObject = [];
        if (results.rows && results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            resultObject.push(results.rows.item(i));
          }
          resolve(resultObject);
        } else {
          reject('No rows found....');
        }
      });
    });
  };

  addTodo = arrValues => {
    return new Promise((resolve, reject) => {
      console.log('firing insert query');
      this.ExecuteQuery(
        'INSERT INTO TODOS (title,isCompleted) VALUES (?,?)',
        arrValues,
      ).then(result => {
        console.log('result of insert query', result);
        resolve(result);
      });
    });
  };

  updateTodo = id => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery("UPDATE TODOS SET isCompleted='1' WHERE id=?", [
        id,
      ]).then(result => {
        resolve(result);
      });
    });
  };

  deleteTodo = id => {
    return new Promise((resolve, reject) => {
      this.ExecuteQuery('DELETE FROM TODOS WHERE id=?', [id]).then(result => {
        console.log('deleted id:', id);
        resolve(result);
      });
    });
  };

  ExecuteQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (tx, results) => resolve(results),
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
        result => resolve(),
        error => reject(),
      );
    });
  };

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

  deleteDatabase = () => SQLite.deleteDatabase(database_name);
}

export const DB = new SQLiteDemo();
