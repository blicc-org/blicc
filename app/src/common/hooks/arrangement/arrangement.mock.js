export const initial = {
  direction: 'row',
  items: [
    {
      id: 'bf1c5774-2b21-49c7-a0d7-cc2855765233',
    },
  ],
}

export const twoElementsHorizontal = {
  direction: 'row',
  items: [
    {
      id: 'c91107cf-035f-4844-aa25-508f28e89a3e',
    },
    {
      id: 'c5843e4d-8fdf-4cc5-936f-2fc0f1cfa1b9',
    },
  ],
}

export const twoElementsVertically = {
  direction: 'column',
  items: [
    {
      id: 'c91107cf-035f-4844-aa25-508f28e89a3e',
    },
    {
      id: 'c91107cf-035f-4844-aa25-508f28e89a3e',
    },
  ],
}

export const complex = {
  direction: 'row',
  items: [
    {
      id: 'c91107cf-035f-4844-aa25-508f28e89a3e',
    },
    {
      direction: 'column',
      items: [
        {
          id: 'c5843e4d-8fdf-4cc5-936f-2fc0f1cfa1b9',
        },
        {
          direction: 'row',
          items: [
            {
              id: 'bfacff6f-c447-4265-b75d-67969445303a',
            },
            {
              id: '9209d20b-b549-4814-bb98-babb0cf775e1',
            },
          ],
        },
      ],
    },
  ],
}

export const complexTwo = {
  direction: 'column',
  items: [
    {
      id: '06b893eb-574a-4300-994b-3c640eceb166',
    },
    {
      direction: 'row',
      items: [
        {
          direction: 'column',
          items: [
            {
              id: 'f9d41352-3a25-497c-be9a-7c6a0370371c',
            },
            {
              id: '9cb1eb77-9cfb-47eb-a61b-15d21d93e46f',
            },
          ],
        },
        {
          id: '6c40039e-fcde-4edb-ae74-7476e6ff53bf',
        },
      ],
    },
  ],
}
