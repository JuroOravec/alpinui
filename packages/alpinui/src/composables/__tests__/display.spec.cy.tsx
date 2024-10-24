/// <reference types="../../../../vuetify/types/cypress" />
/* eslint-disable max-len */
/// <reference types="../../../types/cypress" />

// Components
import { VBanner } from '@/components/VBanner/VBanner';
import { VLayout } from '@/components/VLayout/VLayout';
import { VMain } from '@/components/VMain';
import { VNavigationDrawer } from '@/components/VNavigationDrawer/VNavigationDrawer';
import { VSlideGroup } from '@/components/VSlideGroup/VSlideGroup';

describe('AWindow', () => {
  it('should render items', () => {
    cy.viewport(960, 800)
      .mount(({ mobileBreakpoint }: any) => (
        <VLayout>
          <VNavigationDrawer mobileBreakpoint={ mobileBreakpoint } />

          <VMain>
            <VBanner mobileBreakpoint={ mobileBreakpoint }>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat fugit ratione totam magnam, beatae consequuntur qui quam enim et sapiente autem accusantium id nesciunt maiores obcaecati minus molestiae! Ipsa.
            </VBanner>

            <VSlideGroup mobileBreakpoint={ mobileBreakpoint } />
          </VMain>
        </VLayout>
      ));

    cy
      .setProps({ mobileBreakpoint: 'lg' })
      .get('.a-navigation-drawer').should('have.class', 'a-navigation-drawer--mobile')
      .get('.a-banner').should('have.class', 'a-banner--mobile')
      .get('.a-slide-group').should('have.class', 'a-slide-group--mobile')
      .setProps({ mobileBreakpoint: 959 })
      .get('.a-navigation-drawer').should('not.have.class', 'a-navigation-drawer--mobile')
      .get('.a-banner').should('not.have.class', 'a-banner--mobile')
      .get('.a-slide-group').should('not.have.class', 'a-slide-group--mobile');
  });
});
