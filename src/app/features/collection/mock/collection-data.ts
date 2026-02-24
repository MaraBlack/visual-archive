import { CollectionItem } from "../../../core/models/models";

const NOW_ISO = new Date().toISOString();

export const ITEMS: CollectionItem[] = [
    { id: '1', key: 'digital', date: NOW_ISO, title: 'Untitled #1', img: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc' },
    { id: '2', key: 'digital', date: NOW_ISO, title: 'Untitled #2', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=def' },
    { id: '3', key: 'photography', date: NOW_ISO, title: 'Untitled #4', img: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=jkl' },
    { id: '4', key: 'photography', date: NOW_ISO, title: 'Untitled #3', img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=ghi' },
    { id: '5', key: 'photography', date: NOW_ISO, title: 'Untitled #4', img: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=jkl' },
    { id: '6', key: 'sketchbook', date: NOW_ISO, title: 'Untitled #5', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=mno' },
    { id: '7', key: 'sketchbook', date: NOW_ISO, title: 'Untitled #6', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=pqr' },
    { id: '8', key: 'photography', date: NOW_ISO, title: 'Untitled #4', img: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=jkl' },
    { id: '9', key: 'sketchbook', date: NOW_ISO, title: 'Untitled #6', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=pqr' },
    { id: '10', key: 'sketchbook', date: NOW_ISO, title: 'Untitled #6', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=pqr' },
    { id: '11', key: 'photography', date: NOW_ISO, title: 'This is a medium tittle name', img: 'https://images.unsplash.com/photo-1771030669522-c7af247de300?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];
