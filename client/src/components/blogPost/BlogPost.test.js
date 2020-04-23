import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogPost from './BlogPost';
import { prettyDOM } from '@testing-library/dom'; // automatically imported together with react-testing-lib

const USER = {
  username: 'thisisadam',
  name: 'Adam Aflek'
};

const POST = {
  title: 'Animal Farm',
  author: 'George Orwell',
  url: 'https://www.goodreads.com/book/show/170448.Animal_Farm',
  likes: 111,
  user: USER
};

describe('<BlogPost /> component', () => {
  const mockLikePostFn = jest.fn(() => POST.likes++);
  let component;

  beforeEach(() => {
    component = render(<BlogPost post={POST} likePost={mockLikePostFn}/>);
  });

  test('renders title and author by default', () => {
    expect(component.container).toHaveTextContent(`${POST.title} by ${POST.author}`);
  });

  test('does not render url, likes and user by default', () => {
    const toggleableContentDivInitial = component.container.querySelector('.toggleable-content');
    expect(toggleableContentDivInitial).not.toBeVisible();
  });

  test('shows toggleable content when clicking view details button', () => {
    const viewDetailsButton = component.getByText('View details');
    expect(viewDetailsButton).toBeInTheDocument();

    fireEvent.click(viewDetailsButton);

    const toggleableContentDivInitial = component.container.querySelector('.toggleable-content');
    expect(toggleableContentDivInitial).toBeVisible();
  });

  test('like eventHandler from props is called x times when like button is clicked x times', () => {
    const viewDetailsButton = component.getByText('View details');
    fireEvent.click(viewDetailsButton);

    const likeButton = component.getByText('Like');

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikePostFn.mock.calls).toHaveLength(2);
    expect(POST.likes).toBe(113);
  });
});



