import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders blog title and author only by default', () => {
    const blog = {
        user: '1e5e2357e',
        title: 'i like potatoes',
        author: 'falafel',
        url: 'http://localhost:3001/',
        likes: '9',
    }
    const mockfn = vi.fn()
    render(<Blog blogs={[blog]} setBlogs={mockfn} index={0} user={{username:'heba', name:'haboosh'}} />);

    expect(screen.getByText('i like potatoes', {exact: false})).toBeDefined();
    expect(screen.getByText('falafel', {exact: false})).toBeDefined();
    expect(screen.queryByText('http://localhost:3001/', {exact: false})).toBeNull();
    expect(screen.queryByText('9', {exact: false})).toBeNull();
});