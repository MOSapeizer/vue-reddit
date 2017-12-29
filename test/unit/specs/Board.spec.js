import { mount } from 'vue-test-utils'
import Board from '@/components/Board'

describe('Board.vue', () => {
  let wrapper, posts = [
    {title: 'the title.', author: 'author1', thumbnail: 'sample.jpg'},
    {title: 'the title2.', author: 'author2', thumbnail: ''},
    {title: 'the title3.', author: 'author3', thumbnail: ''},
  ]

  beforeEach(() => {
    wrapper = mount(Board, {
      data: { posts }
    })
  })

  it('should have a name', () => {
    name('board')
  })

  it('should have a post title and author', () => {
    see('the title.', '.post')
    see('author1', '.post')
  })

  it('should have a lot of posts', () => {

    see('the title2.', '.post:nth-child(2)')
    see('author2', '.post:nth-child(2)')
    see('the title3.', '.post:nth-child(3)')
    see('author3', '.post:nth-child(3)')
  })

  it('should have a thumbnail in post', () => {
    picture('sample.jpg', '.post .thumbnail')
  })

  it('should have a placeholder if post has no thumbnail', () => {
    picture('placeholder.jpg', '.post:nth-child(2) .thumbnail')
  })

  it('should display content when click show button', () => {
    let postContent = '.post .content'
    let showButton = '.post .show-btn'

    notContain(postContent)
    click(showButton)
    contain(postContent)
    click(showButton)
    notContain(postContent)
  })

  let click = (selector) => {
    wrapper.find(selector).trigger('click')
  }

  let contain = (selector) => {
    expect(wrapper.contains(selector)).toBe(true);
  }

  let notContain = (selector) => {
    expect(wrapper.contains(selector)).toBe(false);
  }

  let picture = (name, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper

    expect(wrap.element.src).toContain(name)
  }

  let name = (name) => {
    expect(wrapper.name()).toEqual(name)
  }

  let see = (content, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper

    expect(wrap.html()).toContain(content)
  }
})
