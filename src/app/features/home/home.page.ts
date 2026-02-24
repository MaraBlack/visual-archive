import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePage {
    title = 'the visual archive';

    categories = [
        { key: 'digital', title: 'DIGITAL ART', img: 'https://scontent-fra3-1.cdninstagram.com/v/t51.82787-15/624747469_18106414513759355_2623796183161392772_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzAxNzk3NzgzMjgyNzg2MjQ4OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=957A4WGCTMsQ7kNvwHEoI3V&_nc_oc=AdlVg-yPXaEHCj-XizR4Zuc5LG1hDRKXQ4qZUNds75DSCn0_cFiDUVs9-TZKG-LJAlo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_gid=CDLyHevisEtpKZS_czNNxA&oh=00_Afu8RaCvC6x7Yy4uxi4_d5owWvKK8Unauk6sdVpjyI1w6g&oe=69A3A7F0' },
        { key: 'sketchbook', title: 'SKETCHBOOK', img: 'https://scontent-fra3-1.cdninstagram.com/v/t39.30808-6/470224344_18113289319426934_3214151663284653921_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzI4NzMwNTcxNTMwMjQzMTAzMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=ZMW18MObWrwQ7kNvwEaLYUB&_nc_oc=Adn0yPvKMIydVCgtW_PQRiizoktyySPoe5VX97l8xc0oQVOX66zYIQbqqti1J4pJmc4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_gid=yiDQoYEnyiBGhbdUI1EcVQ&oh=00_AfuwMN6vPbHKMDNgaSqux6c8FH1KyFW7fZ7bXT4HC_CP2Q&oe=69A37CA1' },
        { key: 'photography', title: 'PHOTOGRAPHY', img: 'https://scontent-fra3-1.cdninstagram.com/v/t51.82787-15/621637397_18071278022432728_7339366754187545701_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzM2MjY4MDI2MDEyODAxNDA1OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=iBTVm37F7McQ7kNvwFMY-qj&_nc_oc=AdlgI_Am0bwaVCyHFPNCXagvem2RRPfrJ-ZmYbrd8cHKa-FLDAZqW9HetZ-PySp31Ns&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_gid=yiDQoYEnyiBGhbdUI1EcVQ&oh=00_AfuBDp2TSWLiQiAhgRekhJFWjkpWpXRnl1RCgNa0KiLDzg&oe=69A3939C' }
    ];
}
