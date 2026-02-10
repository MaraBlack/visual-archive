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
        { key: 'digital', title: 'DIGITAL ART', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1' },
        { key: 'photography', title: 'PHOTOGRAPHY', img: 'https://posterjack.ca/cdn/shop/articles/landscape_photography_tips_featured_image.jpg?v=1563408049&width=1400' },
        { key: 'sketchbook', title: 'SKETCHBOOK', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=3' }
    ];
}
