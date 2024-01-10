'use client';

import { List } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProjectList({
  projects,
}: {
  projects: {
    id: string;
    title: string | null;
    description: string | null;
    isClosed: boolean;
    isFinalize: boolean;
  }[];
}) {
  return (
    <List
      itemLayout='horizontal'
      dataSource={projects}
      renderItem={(item) => (
        <List.Item
          actions={[<Link href={`/myprojects/${item.id}`}>مشاهده</Link>]}
        >
          <List.Item.Meta
            avatar={
              <Image
                alt={item.title || 'بدون عنوان'}
                width={50}
                height={50}
                src='/assets/progress.png'
                style={{
                  objectFit: 'contain',
                }}
              />
            }
            title={item.title || 'بدون عنوان'}
            description={item.description || item.id}
          />
        </List.Item>
      )}
    />
  );
}

export default ProjectList;
