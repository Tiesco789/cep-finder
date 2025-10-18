import { Routes } from '@angular/router';
import { Search } from './search/search';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'search',
    component: Search
  }
];
