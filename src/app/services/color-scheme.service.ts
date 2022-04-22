import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {

  constructor() { }

  checkColorScheme() {
    // const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    // if (darkMode.matches) {
    //   console.log('Dark Mode');
    //   return 'dark';
    // } else {
    //   console.log('Light Mode');
    //   return 'light';
    // }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newColorScheme = e.matches ? "dark" : "light";
      console.log(newColorScheme);
      return newColorScheme;
    });
  }


}
