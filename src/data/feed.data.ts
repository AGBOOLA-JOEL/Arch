import { v4 as uuid } from "uuid";

export const filtercategories = [
  {
    id: uuid(),
    name: "Categories",
    data: [
      {
        id: uuid(),
        header: "Residential Architecture",
        subheader: [
          {
            id: uuid(),
            title: "HOUSING",
            content: [
              { id: uuid(), subcontent: "Apartments" },
              { id: uuid(), subcontent: "Penthouse" },
            ],
          },
          { id: uuid(), title: "HOUSES", content: [] },
          { id: uuid(), title: "SOCIAL HOUSING", content: [] },
        ],
      },
      {
        id: uuid(),
        header: "Interior Design",
        subheader: [
          {
            id: uuid(),
            title: "HOSPITALITY INTERIORS",
            content: [
              { id: uuid(), subcontent: "Restaurant & Bar Interiors" },
              { id: uuid(), subcontent: "Coffee Shop Interiors" },
              { id: uuid(), subcontent: "Wellness Interiors" },
              { id: uuid(), subcontent: "Hotels Interiors" },
              { id: uuid(), subcontent: "House Interiors" },
              { id: uuid(), subcontent: "Apartment Interiors" },
            ],
          },
          { id: uuid(), title: "OFFICES INTERIORS", content: [] },
          {
            id: uuid(),
            title: "CULTURAL INTERIORS",
            content: [
              { id: uuid(), subcontent: "Museum & Exhibition Interiors" },
            ],
          },
          { id: uuid(), title: "RETAIL INTERIORS", content: [] },
          { id: uuid(), title: "HEALTHCARE INTERIORS", content: [] },
          { id: uuid(), title: "EDUCATIONAL INTERIORS", content: [] },
          { id: uuid(), title: "SPORTS INTERIORS", content: [] },
        ],
      },
      {
        id: uuid(),
        header: "Cultural Architecture",
        subheader: [
          {
            id: uuid(),
            title: "LEARNING",
            content: [
              { id: uuid(), subcontent: "Visitor center" },
              { id: uuid(), subcontent: "Visual arts center" },
              { id: uuid(), subcontent: "Science center" },
              { id: uuid(), subcontent: "Watching tower" },
              { id: uuid(), subcontent: "Youth center" },
              { id: uuid(), subcontent: "Zoo" },
              { id: uuid(), subcontent: "Aquarium" },
              { id: uuid(), subcontent: "Interpretation Center" },
              { id: uuid(), subcontent: "Theater" },
              { id: uuid(), subcontent: "Performing arts center" },
              { id: uuid(), subcontent: "Auditorium" },
              { id: uuid(), subcontent: "Music Venue" },
              { id: uuid(), subcontent: "Cinema" },
              { id: uuid(), subcontent: "Concert House" },
              { id: uuid(), subcontent: "Amphitheater" },
              { id: uuid(), subcontent: "Dance hall" },
              { id: uuid(), subcontent: "Opera house" },
            ],
          },
          {
            id: uuid(),
            title: "MUSEUMS & EXHIBIT",
            content: [
              { id: uuid(), subcontent: "Museum" },
              { id: uuid(), subcontent: "Pavilion" },
              { id: uuid(), subcontent: "Gallery" },
              { id: uuid(), subcontent: "Exhibition center" },
            ],
          },
          { id: uuid(), title: "LIBRARY", content: [] },
          { id: uuid(), title: "CULTURAL CENTER", content: [] },
          { id: uuid(), title: "HERITAGE", content: [] },
        ],
      },
      {
        id: uuid(),
        header: "Commercial & Offices",
        subheader: [
          {
            id: uuid(),
            title: "SERVICES",
            content: [
              { id: uuid(), subcontent: "Gas station" },
              { id: uuid(), subcontent: "Charging Station" },
            ],
          },
        ],
      },
      {
        id: uuid(),
        header: "Hospitality Architecture",
        subheader: [
          {
            id: uuid(),
            title: "RESTAURANTS & BARS",
            content: [
              { id: uuid(), subcontent: "Restaurant" },
              { id: uuid(), subcontent: "Coffee Shop" },
              { id: uuid(), subcontent: "Bar" },
              { id: uuid(), subcontent: "Fast food" },
              { id: uuid(), subcontent: "Nightclub" },
              { id: uuid(), subcontent: "Pub" },
              { id: uuid(), subcontent: "Dance Club" },
            ],
          },
          {
            id: uuid(),
            title: "LODGING",
            content: [
              { id: uuid(), subcontent: "Cabins & Lodges" },
              { id: uuid(), subcontent: "Hostel" },
            ],
          },
          { id: uuid(), title: "HOTELS", content: [] },
          {
            id: uuid(),
            title: "TOURISM",
            content: [
              { id: uuid(), subcontent: "THEME PARKS" },
              { id: uuid(), subcontent: "CASINO" },
            ],
          },
        ],
      },
      {
        id: uuid(),
        header: "Public Architecture",
        subheader: [
          {
            id: uuid(),
            title: "GOVERNMENT",
            content: [
              { id: uuid(), subcontent: "Town & City Hall" },
              { id: uuid(), subcontent: "Municipal building" },
              {
                id: uuid(),
                subcontent: "Other Public Administration buildings",
              },
              { id: uuid(), subcontent: "Courthouse" },
              { id: uuid(), subcontent: "Embassy" },
              { id: uuid(), subcontent: "Ministry building" },
            ],
          },
          {
            id: uuid(),
            title: "SECURITY",
            content: [
              { id: uuid(), subcontent: "Fire station" },
              { id: uuid(), subcontent: "Police Station" },
              { id: uuid(), subcontent: "Emergency Services Facility" },
            ],
          },
          {
            id: uuid(),
            title: "MILITARY",
            content: [
              { id: uuid(), subcontent: "Headquarters" },
              { id: uuid(), subcontent: "Training Facility" },
            ],
          },
          {
            id: uuid(),
            title: "COMMUNITY",
            content: [{ id: uuid(), subcontent: "Community center" }],
          },
          { id: uuid(), title: "MONUMENTS", content: [] },
        ],
      },
      {
        id: uuid(),
        header: "Healthcare Architecture",
        subheader: [
          {
            id: uuid(),
            title: "HOSPITAL",
            content: [
              { id: uuid(), subcontent: "Healthcare center" },
              { id: uuid(), subcontent: "Clinic" },
              { id: uuid(), subcontent: "Medical facilities" },
              { id: uuid(), subcontent: "Dental Clinic" },
              { id: uuid(), subcontent: "Rehabilitation center" },
            ],
          },
          {
            id: uuid(),
            title: "WELLBEING",
            content: [
              { id: uuid(), subcontent: "Spa & Sauna" },
              { id: uuid(), subcontent: "Bath House" },
            ],
          },
          {
            id: uuid(),
            title: "VETERINARY",
            content: [
              { id: uuid(), subcontent: "Animal Shelter" },
              { id: uuid(), subcontent: "Veterinary clinic" },
            ],
          },
          { id: uuid(), title: "RESEARCH Laboratory", content: [] },
        ],
      },
      {
        id: uuid(),
        header: "Sports Architecture",
        subheader: [
          {
            id: uuid(),
            title: "GYMNASIUM",
            content: [
              { id: uuid(), subcontent: "Swimming pool" },
              { id: uuid(), subcontent: "Sports field" },
              { id: uuid(), subcontent: "Fitness club" },
              { id: uuid(), subcontent: "Football stadium" },
              { id: uuid(), subcontent: "Soccer stadium" },
            ],
          },
        ],
      },
      {
        id: uuid(),
        header: "Religious Architecture",
        subheader: [
          {
            id: uuid(),
            title: "WORSHIP",
            content: [
              { id: uuid(), subcontent: "Churches" },
              { id: uuid(), subcontent: "Chapel" },
              { id: uuid(), subcontent: "Temple" },
              { id: uuid(), subcontent: "Mosque" },
              { id: uuid(), subcontent: "Monastery" },
              { id: uuid(), subcontent: "Synagogue" },
              { id: uuid(), subcontent: "Cathedral" },
              { id: uuid(), subcontent: "Praying Room" },
            ],
          },
          {
            id: uuid(),
            title: "BURIAL",
            content: [
              { id: uuid(), subcontent: "Memorial Center" },
              { id: uuid(), subcontent: "Cemetery" },
              { id: uuid(), subcontent: "Crematorium" },
              { id: uuid(), subcontent: "Crypts & Mausoleums" },
              { id: uuid(), subcontent: "Grave" },
            ],
          },
        ],
      },
      {
        id: uuid(),
        header: "Industrial & Infrastructure",
        subheader: [
          {
            id: uuid(),
            title: "BRIDGES",
            content: [
              { id: uuid(), subcontent: "Pedestrian bridge" },
              { id: uuid(), subcontent: "Vehicular bridge" },
            ],
          },
          { id: uuid(), title: "FACTORY", content: [] },
          { id: uuid(), title: "WINERY", content: [] },
          { id: uuid(), title: "WAREHOUSE", content: [] },
          { id: uuid(), title: "BARN", content: [] },
          { id: uuid(), title: "BREWERY", content: [] },
          { id: uuid(), title: "ENERGY PLANT", content: [] },
          { id: uuid(), title: "DISTRIBUTION CENTER", content: [] },
          { id: uuid(), title: "BOTTLING PLANT", content: [] },
        ],
      },
    ],
  },
  {
    id: uuid(),
    name: "Area",
    data: [],
  },
];
