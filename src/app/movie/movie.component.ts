import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  ngOnInit(): void {
    this.mostrarInformacionPelicula();
  }

  // Función para obtener el ID de la película de la URL
  obtenerIdPeliculaDeURL(): string | null {
    // Obtener la ruta actual del enrutador de Angular
    const currentUrl = window.location.href;
    // Obtener la parte de la URL después del último "/"
    const id = currentUrl.substr(currentUrl.lastIndexOf('/') + 1);
    return id;
  }

  // Funcion para hacer la solicitud a la API de TMDB y mostrar la información de la película
  mostrarInformacionPelicula() {
    const movieId = this.obtenerIdPeliculaDeURL();
    console.log(movieId);
    const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';

    // Hacer la solicitud a la API de TMDB para obtener la información de la película
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`)
      .then(response => response.json())
      .then((data: any) => {
        const header = document.getElementById("header") as HTMLElement;
      header.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;

      const tituloPelicula = document.getElementById('tituloPelicula') as HTMLElement;
      tituloPelicula.textContent = `${data.title}`;

      const frasePelicula = document.getElementById('frasePelicula') as HTMLElement;
      frasePelicula.textContent = `${data.tagline}`;

      const posterPeli = document.getElementById('posterPeli') as HTMLElement;
      posterPeli.innerHTML = `<img class="poster" src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="movie poster">`;

      // Mostrar la información de la película en la página
      const movieInfoDiv = document.getElementById('movieInfo') as HTMLElement;
      const genresDivs = data.genres.map((genre: { name: string }) => `<div class="genre"><strong>${genre.name}</strong></div>`).join('');

      movieInfoDiv.innerHTML = `
          <div class="container-titles">
            <h2>${data.title}</h2>
            <h3>${data.tagline}</h3>
          </div>
          <div class="container-plot">
            <p><strong>Sinopsis:</strong></p>
            <p>${data.overview}</p>
          </div>

          <div class="genres-container">
            <p><strong>Géneros:</strong></p>
            ${genresDivs}
          </div>
          
          <div class="original-language-container">
            <p><strong>Titulo Original:</strong> ${data.original_title}</p>
            <p><strong>Idioma Original:</strong> ${data.original_language}</p>
            <p><strong>Estado:</strong> ${data.status}</p>
          </div>
`;

      let runtime = data.runtime;
      let hours = Math.floor(runtime / 60);
      let minutes = runtime % 60;
      let durationString = hours + "h " + minutes + "min";

      let budget = data.budget;
      let formattedBudget = budget.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      const barInfo = document.getElementById('barInfo') as HTMLElement;
      barInfo.innerHTML = `
        <div class="bar-info-icon">
          <i class="bi bi-calendar3"></i>
          <p><strong>Lanzamiento:</strong> ${data.release_date}</p>
        </div>
        <div class="bar-info-icon">
          <i class="bi bi-clock"></i>
          <p><strong>Duración:</strong> ${durationString}</p>
        </div>
        <div class="bar-info-icon">
          <i class="bi bi-cash-coin"></i>
          <p><strong>Presupuesto:</strong> ${formattedBudget}</p>
        </div>
`;

      let voteAverage = data.vote_average;
      let formattedVoteAverage = Number(voteAverage.toFixed(1));

      function getColorForVoteAverage(formattedVoteAverage: number): string {
        if (formattedVoteAverage >= 7) {
          return "#00E676"; // Verde para puntajes altos
        } else if (formattedVoteAverage >= 5) {
          return "#FFEB3B"; // Amarillo para puntajes medios
        } else {
          return "#FF5252"; // Rojo para puntajes bajos
        }
      }

      let color = getColorForVoteAverage(formattedVoteAverage);

      const scoreFace = document.getElementById('scoreFace') as HTMLElement;

      scoreFace.style.color = color;

      function getEmoji(formattedVoteAverage: number): string {
        if (formattedVoteAverage >= 7) {
          return "bi bi-emoji-smile";
        } else if (formattedVoteAverage >= 5) {
          return "bi bi-emoji-neutral";
        } else {
          return "bi bi-emoji-frown"; 
        }
      }
      scoreFace.innerHTML = `
        <i class="${getEmoji(formattedVoteAverage)}"></i>
      `;
      })
      .catch(error => {
        console.error('Error al obtener información de la película:', error);
      });
  }
}
