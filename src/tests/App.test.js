import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao renderizar o componente App', () => {
  test('É exibido na tela um link com o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
  });

  test('Teste se ao clicar no link Home, a página é redirecionada para a URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('É exibido na tela um link com o texto About', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
  });

  test('Teste se ao clicar no link Home, a página é redirecionada para a URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/i);
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('É exibido na tela um link com o texto Favorite Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkFavorite = getByText(/Favorite Pokémon/i);
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Teste se ao clicar no link Home, a página é redirecionada para a URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorite = getByText(/Favorite Pokémon/i);
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found, ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-valid-url');
    const path = history.location.pathname;
    expect(path).toBe('/not-valid-url');
  });
});
