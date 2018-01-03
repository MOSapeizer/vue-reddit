import { mount } from 'vue-test-utils'
import moxios from 'moxios'
import Board from '@/components/Board'

describe('Board.vue', () => {
  let wrapper, posts = [
    {title: 'the title.', author: 'author1', thumbnail: 'sample.jpg', show: false, content: ''},
    {title: 'the title2.', author: 'author2', thumbnail: '', show: false, content: 'sample.jpg'},
    {title: 'the title3.', author: 'author3', thumbnail: '', show: false, content: 'fuck'},
  ]

  beforeEach(() => {
    moxios.install()
    wrapper = mount(Board, {
      data: {posts, placeHolder: 'placeholder.jpg'}
    })
  })

  afterEach(() => {
    moxios.uninstall()
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
    picture(posts[0].thumbnail, '.post .thumbnail')
  })

  it('should have a placeholder if post has no thumbnail', () => {
    picture('placeholder.png', '.post:nth-child(2) .thumbnail')
  })

  it('如果無法快速查看，不顯示按鈕', () => {
    let showButton = '.post:first-child .show-btn'
    let postContent = '.post:first-child .content'

    notContain(showButton)
    notContain(postContent)
  })

  it('如果有快速查看按鈕，點擊後可以開關查看的內容', () => {
    let showButton = '.post:nth-child(2) .show-btn'
    let postContent = '.post:nth-child(2) .content'
    let anotherPostContent = '.post:nth-child(3) .content'

    contain(showButton)
    notContain(postContent)
    notContain(anotherPostContent)

    click(showButton)
    contain(postContent)
    see(posts[1].content, postContent)

    notContain(anotherPostContent)
  })

  it('只有點擊查看按鈕的文章，會顯示文章內容', () => {
    let showButton = '.post:nth-child(2) .show-btn'
    let anotherPostContent = '.post:nth-child(3) .content'

    notContain(anotherPostContent)
    click(showButton)
    notContain(anotherPostContent)
  })

  it('內容如果是圖片連結，要顯示圖片', () => {
    let showButton = '.post:nth-child(2) .show-btn'
    let postContent = '.post:nth-child(2) .content'

    click(showButton)
    picture(posts[1].content, `${postContent} img`)
  })

  it('要有推文的區塊', () => {

  })

  it('推、噓文只能二選一', () => {

  })

  it('按推噓文按鈕，要顯示對應顏色', () => {

  })

  it('要有發文的區塊', () => {
    contain('.new-post-section')
  })

  it('發文的區塊要可以發表文章', (done) => {
    let newPost = {title: 'the title4.', author: '黑人', content: 'this is my message'}

    input('#author', newPost.author)
    input('#title', newPost.title)
    input('#content', newPost.content)

    click('#sendPost')

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()

      request.respondWith({
        status: 200,
        response: {
          id: 4,
          title: 'the title4.',
          author: '黑人',
          content: 'this is my message',
          thumbnail: '',
          show: false
        }
      }).then(function () {

        see('title4', '.post:last-child')
        see('黑人', '.post:last-child')
        done()
      })
    })
  })

  let input = (selector, value) => {
    wrapper.find(selector).element.value = value
  }

  let click = (selector) => {
    wrapper.find(selector).trigger('click')
  }

  let contain = (selector) => {
    expect(wrapper.contains(selector)).toBe(true)
  }

  let notContain = (selector) => {
    expect(wrapper.contains(selector)).toBe(false)
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

  let cannotSee = (content, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper

    expect(wrap.html()).not.toContain(content)
  }
})
