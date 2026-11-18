import './tailwind.css';
import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';

const target = document.getElementById('root') ?? document.body;

const app = mount(App, { target });

export default app;
