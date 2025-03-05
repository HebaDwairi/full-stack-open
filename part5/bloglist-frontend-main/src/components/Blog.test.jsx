import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  let container;
  const mockLikeBlog = vi.fn();
  const mockRemoveBlog = vi.fn();

  beforeEach(() => {
    const blog = {
      user: '1e5e2357e',
      title: 'blog title',
      author: 'blog author',
      url: 'http://localhost:3001/',
      likes: '9',
    }
    const mockfn = vi.fn();
    container = render(<Blog 
       blog={blog}
       removeBlog={mockRemoveBlog}
       likeBlog={mockLikeBlog}
       user={{username:'heba', name:'heba'}} />).container;
  });
  
  test('renders blog title and author only by default', () => {
    expect(screen.getByText('blog title', {exact: false})).toBeDefined();
    expect(screen.getByText('blog author', {exact: false})).toBeDefined();
    expect(screen.queryByText('http://localhost:3001/', {exact: false})).toBeNull();
    expect(screen.queryByText('9', {exact: false})).toBeNull();
  });
  
  test('number of likes and url are shown when view button is clicked',async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);
  
    expect(screen.getByText('http://localhost:3001/', {exact: false})).toBeDefined();
    expect(screen.getByText('9', {exact: false})).toBeDefined();
  
  });
  
  
  test('when like button is clicked twice the event handler is called twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeBlog.mock.calls).toHaveLength(2);
  });
});