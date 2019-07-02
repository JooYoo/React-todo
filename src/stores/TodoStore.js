import { observable, action, computed} from 'mobx';

class TodoStore{
    @observable filter= "all";
    @observable beforeEditCache= "";
    @observable idForTodo= 3;
    @observable todos= [
      {
        id: 1,
        title: "xBox new",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "PlayStation new",
        completed: false,
        editing: false
      },
      {
        id: 3,
        title: "Switch new",
        completed: false,
        editing: false
      }
    ]
}

const store = new TodoStore();
export default store;