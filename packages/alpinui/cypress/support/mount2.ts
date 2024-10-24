/// <reference types="cypress" />

// TODO
// TODO
// TODO
// TODO

/**
 * @example
 * cy.mount(<VBtn>My button</VBtn>)
 */
Cypress.Commands.add('mount', (component, options, alpinuiOptions) => {
  const root = document.getElementById('cy-root')!;

  // add the a-application class that allows Vuetify styles to work
  if (!root.classList.contains('a-locale--is-rtl')) {
    root.classList.add('a-locale--is-ltr');
  }

  const vuetify = createVuetify(mergeDeep({
    icons: { aliases },
  }, vuetifyOptions));
  const defaultOptions = {
    global: {
      stubs: {
        transition: false,
        'transition-group': false,
      },
      plugins: [vuetify],
    },
  };

  const mountOptions = mergeDeep(defaultOptions, options!, (a, b) => a.concat(b));

  return cyMount(component, mountOptions)
    .then(({ wrapper }) => {
      cy.wrap(wrapper).as('wrapper');
    });
});

// TODO
// TODO
// TODO
// TODO
// describe('Alpine.js Component Test', () => {
//   // Function to load the HTML and JS scripts
//   const loadHtml = () => {
//     cy.document().then((doc) => {
//       // Load Alpine.js
//       const script = doc.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.2.2/cdn.min.js';
//       doc.head.appendChild(script);

//       // Add your custom JS scripts if needed
//       const customScript = doc.createElement('script');
//       customScript.textContent = `
//         document.addEventListener('alpine:init', () => {
//           Alpine.data('testComponent', () => ({
//             count: 0,
//             increment() {
//               this.count++;
//             },
//           }));
//         });
//       `;
//       doc.head.appendChild(customScript);

//       // Set up HTML with Alpine.js component
//       const htmlContent = `
//         <div x-data="testComponent">
//           <span id="count" x-text="count"></span>
//           <button id="increment" @click="increment()">Increment</button>
//         </div>
//       `;
//       doc.body.innerHTML = htmlContent;
//     });
//   };

//   beforeEach(() => {
//     cy.visit('about:blank'); // Navigate to a blank page
//     loadHtml(); // Load the HTML and JS
//   });

//   it('should display the initial count', () => {
//     cy.get('#count').should('have.text', '0');
//   });

//   it('should increment the count on button click', () => {
//     cy.get('#increment').click();
//     cy.get('#count').should('have.text', '1');
//   });
// });
