import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPopularTags } from '../../../services/tag.service';

interface Props {
  selected: string[];
  updateTag: (tag: string) => void;
}

export default function PopularTags({ updateTag, selected }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['popularTags'],
    queryFn: () => getPopularTags(),
  });

  function update(event: React.MouseEvent<HTMLAnchorElement>, tag: string): void {
    event.preventDefault();
    updateTag(tag);
  }

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {isLoading && <div>Loading tags...</div>}
        {data &&
          data.map((tag: string) => (
            <a
              key={tag}
              href=""
              className={`tag-pill tag-default ${selected.includes(tag) ? 'tag-primary' : ''}`}
              onClick={event => update(event, tag)}
            >
              {tag}
            </a>
          ))}
      </div>
    </div>
  );
}
