function toTitleCase(value = '') {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}

export const CASE_CATEGORIES = [
  {
    slug: 'retina',
    label: 'Retina',
    description: 'Macular disease, vitreoretinal pathology, and OCT pattern recognition.',
  },
  {
    slug: 'neuro-ophthalmology',
    label: 'Neuro-ophthalmology',
    description: 'Optic nerve, visual pathway, and neuro-imaging correlated cases.',
  },
  {
    slug: 'uveitis',
    label: 'Uveitis',
    description: 'Inflammatory disease cases with multimodal imaging and pearls.',
  },
  {
    slug: 'glaucoma',
    label: 'Glaucoma',
    description: 'RNFL, GCC, and optic nerve interpretation through progressive cases.',
  },
  {
    slug: 'ocular oncology',
    label: 'Ocular Oncology',
    description: 'Tumour-related OCT findings and differential diagnosis casework.',
  },
  {
    slug: 'paediatric ophthalmology',
    label: 'Paediatric Ophthalmology',
    description: 'Paediatric retina and neuro-ophthalmic presentations for trainees.',
  },
  {
    slug: 'cornea',
    label: 'Cornea',
    description: 'Anterior segment OCT and corneal pathology examples.',
  },
];

export function getCaseCategoryMeta(category) {
  return (
    CASE_CATEGORIES.find((item) => item.slug === category) || {
      slug: category,
      label: toTitleCase(category),
      description: 'Educational OCT practice cases.',
    }
  );
}
