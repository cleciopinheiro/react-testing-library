import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRounter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa a página NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRounter(<NotFound />);
    const title = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRounter(<NotFound />);
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const imageSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image.src).toBe(imageSRC);
  });
});
