import { Component } from '@angular/core';
import { MyNavBarComponent } from '../my-nav-bar/my-nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyNavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}

interface Movie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
}

const cargarCincoPopulares = async () => {
  const pagina = 1; // Asegúrate de definir la variable 'pagina'
  try {
      const respuesta = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX&page=${pagina}`);
      console.log(respuesta);

      if (respuesta.status === 200) {
          const datos = await respuesta.json();
          console.log(datos);

          const populares: Movie[] = datos.results.slice(0, 5);

          let index = 0;

          const mostrarCincoPopulares = () => {
            const popularObj = populares[index];
        
            const myHeader = document.getElementById('myHeader') as HTMLElement;
            myHeader.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${popularObj.backdrop_path})`;
        
            const posterHeaderPopular = document.getElementById('posterHeaderPopular') as HTMLImageElement;
            posterHeaderPopular.src = `https://image.tmdb.org/t/p/original/${popularObj.poster_path}`;
        
            const titlePopular = document.getElementById('titlePopular') as HTMLElement;
            titlePopular.textContent = popularObj.title;
        
            const generosPopular = document.getElementById('generosPopular') as HTMLElement;
            generosPopular.textContent = popularObj.release_date;
        
            const headerURL = document.getElementById('headerURL') as HTMLAnchorElement;
            // Redirigir a la página movie con el parámetro id en la URL
            headerURL.href = `movie/${popularObj.id}`;
        
            index = (index + 1) % 5;
        };
        

          mostrarCincoPopulares();
          setInterval(mostrarCincoPopulares, 7000);
      } else if (respuesta.status === 401) {
          console.log('Error de comunicación con el servidor');
      } else if (respuesta.status === 404) {
          console.log('Película no encontrada');
      } else {
          console.log('Hubo un error');
      }
  } catch (error) {
      console.log(error);
  }
};

cargarCincoPopulares();