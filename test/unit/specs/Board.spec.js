import { mount } from 'vue-test-utils'
import Board from '@/components/Board'

describe('Board.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Board)
  })

  it('should have a name', () => {
    expect(wrapper.name()).toEqual('board')
  })

  it('should have a post title and author', () => {
    wrapper.setData({
      posts: [
        {
          title: 'the title.',
          author: 'author1'
        }
      ]
    })

    see('the title.', '.post')
    see('author1', '.post')
  })

  it('should have a lot of posts', () => {
    wrapper.setData({
      posts: [
        { title: 'the title.',  author: 'author1'},
        { title: 'the title2.',  author: 'author2'},
        { title: 'the title3.',  author: 'author3'},
      ]
    })

    see('the title.', '.post')
    see('author1', '.post')
    see('the title2.', '.post:nth-child(2)')
    see('author2', '.post:nth-child(2)')
    see('the title3.', '.post:nth-child(3)')
    see('author3', '.post:nth-child(3)')
  })

  let see = (content, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper;

    expect(wrap.html()).toContain(content)
  }
})
