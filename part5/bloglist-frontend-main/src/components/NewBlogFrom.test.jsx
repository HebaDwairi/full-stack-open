import {render, screen} from '@testing-library/react';
import NewBlogForm from './NewBlogFrom';
import userEvent from '@testing-library/user-event';

describe('<NewBlogForm />', () => {
    test('newblogform calls the event handler with correct details when new blog is created', async () => {
      const blog = {
        title: 'blog title',
        author: 'author name',
        url: 'blog url'
      }

      const mockHandler = vi.fn();

      render(<NewBlogForm handleNewBlog={mockHandler}/>);

      const user = userEvent.setup();

      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0], blog.title);
      await user.type(inputs[1], blog.author);
      await user.type(inputs[2], blog.url);

      const button = screen.getByText('create');
      await user.click(button);
      
      expect(mockHandler.mock.calls).toHaveLength(1);
      expect(mockHandler.mock.calls[0][0].title).toBe(blog.title);
      expect(mockHandler.mock.calls[0][0].author).toBe(blog.author);
      expect(mockHandler.mock.calls[0][0].url).toBe(blog.url);
    });
});