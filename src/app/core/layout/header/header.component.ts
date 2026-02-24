import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    nav = [
        { label: 'HOME', path: '/', exact: true },
        { label: 'COLLECTION', path: '/collection', exact: false },
        { label: 'ABOUT', path: '/about', exact: true },
    ];
    menuOpen = false;

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
        this.menuOpen = false;
    }
}
