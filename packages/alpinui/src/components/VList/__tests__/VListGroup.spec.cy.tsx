/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VListGroup } from '../VListGroup.base'
import { VListItem } from '../VListItem.base'
import { VList } from '../VList.base'

describe('VListGroup', () => {
  function mountFunction(content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports header slot', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList>
          <VListGroup>
            {{ activator: props => <VListItem {...props} title="Group" /> }}
          </VListGroup>
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('Group')
  })

  it('supports children', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList opened={['group']}>
          <VListGroup value="group">
            {{
              activator: props => <VListItem {...props} title="Group" />,
              default: () => (
                <>
                  <VListItem title="Child 1" />
                  <VListItem title="Child 2" />
                </>
              ),
            }}
          </VListGroup>
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('Group')
  })
})
