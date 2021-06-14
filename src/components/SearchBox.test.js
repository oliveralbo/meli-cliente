import SearchBox from './SearchBox'
import { render, cleanup,fireEvent } from '@testing-library/react'



const getRenderedComponent = ({ ...args }) => render(<SearchBox {...args} />)


describe('<SearchBox/>', () => {


    it('Must render the component', () => {
        const SearchBox = getRenderedComponent({})
    
        expect(SearchBox.baseElement).toMatchSnapshot()
      })


    it('Must fire Click event', () => {
        const onActionMock = jest.fn()

        const SearchBox = getRenderedComponent({
            handleSearch: onActionMock
          })

        const button = SearchBox.getByLabelText('button-search')

        fireEvent.click(button)
        expect(onActionMock).toHaveBeenCalled()
    })

    it('Must take input value change', () => {


        const SearchBox = getRenderedComponent({})

        const input = SearchBox.getByLabelText('input-search')
        fireEvent.input(input, { target: { value: 'oliverio' } })
        expect(input.value).toBe('oliverio')

    })

    it('Must take input value params', () => {

        const SearchBox = getRenderedComponent({search: 'valor'})

        const input = SearchBox.getByLabelText('input-search')
      
        expect(input.value).toBe('valor')

    })


 
  })