import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'slider',
  title: 'Slider-Images',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
      name: 'project',
      title: 'Project',
      type: 'string',
    }),

    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first in the homepage slider.',
      validation: (Rule) => Rule.integer().min(1),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      imgUrl: 'imgUrl',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'sortOrder',
      media: 'image',
    },
  },
})
