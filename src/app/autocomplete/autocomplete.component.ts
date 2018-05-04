import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const searchInput = <HTMLInputElement>document.getElementById('search');
    const suggestList = document.getElementById('suggest-list');

    const keyword = Observable.fromEvent<any>(searchInput, 'input');
    const selectItem = Observable.fromEvent<any>(suggestList, 'click');

    const render = (suggestArr = []) => {
      suggestList.innerHTML = suggestArr
        .map(item => '<li>'+ item +'</li>')
        .join('');
    }

    keyword
      .filter(e => e.target.value.length > 2)
      .debounceTime(100)
      .switchMap(e => Observable.from(this.getSuggestList(e.target.value)).retry(3), (e, res) => res[1])
      .subscribe(list => render(list));

    selectItem
      .filter(e => e.target.matches('li'))
      .map(e => e.target.innerText)
      .subscribe(text => {
        searchInput.value = text;
        render();
      })
  }

  getSuggestList(keyword) {
    const url = 'https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&origin=*';
    return fetch(url + '&search=' + keyword, { method: 'GET', mode: 'cors' })
      .then(res => res.json())
  }
}
