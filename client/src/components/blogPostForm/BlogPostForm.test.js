import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // custom matchers for DOM
import { render, fireEvent } from '@testing-library/react';
import BlogPostForm from './BlogPostForm';
import { prettyDOM } from '@testing-library/dom'; // automatically imported together with react-testing-lib

test('<BlogPostForm /> component submits postObject with correct title when form is submitted', () => {
  const TITLE = 'Animal Farm';
  const mockCreatePostFn = jest.fn();

  const component = render(<BlogPostForm createPost={mockCreatePostFn} />);

  const titleInput = component.container.querySelector('input');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: TITLE }
  });

  fireEvent.submit(form);
  expect(mockCreatePostFn.mock.calls[0][0].title).toBe(TITLE);
});