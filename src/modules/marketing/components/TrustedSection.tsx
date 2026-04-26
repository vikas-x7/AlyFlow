'use client';

import { GitPullRequest, Pencil, Box, Users } from 'lucide-react';

const stats = [
  { label: 'Flows created', value: '84K' },
  { label: 'Nodes connected', value: '2.1M' },
  { label: 'Hours saved', value: '40K' },
  { label: 'Canvas size limit', value: 'unlimited ' },
];

const features = [
  {
    icon: <Box size={18} />,
    title: 'Unlimited canvas',
    desc: 'Build flows without boundaries. Alyflow gives you an unlimited canvas so your ideas never feel cramped zoom, pan, and place nodes anywhere.',
  },
  {
    icon: <Pencil size={18} />,
    title: 'Drag, drop and connect',
    desc: 'Creating a flow is as simple as dragging a node and drawing an edge. No technical setup needed just think visually and build.',
  },
  {
    icon: <GitPullRequest size={18} />,
    title: 'Smart edge routing',
    desc: 'Edges automatically find the cleanest path between nodes. Keep your diagrams readable even as they grow complex.',
  },
  {
    icon: <Users size={18} />,
    title: 'Canvas share',
    desc: 'Share your canvas with teammates, gather feedback, and iterate together. Alyflow is designed for collaboration from the ground up.',
  },
];

export default function TrustedSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-gothic">
      <div className="">
        <div className="mt-0 sm:mt-32 md:mt-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-medium text-black mb-8 sm:mb-12 -tracking-[1px] sm:-tracking-[2px]">Why you should choose Alyflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-8 sm:gap-y-10 mt-10 sm:mt-16 md:mt-25">
            {features.map((f) => (
              <div key={f.title}>
                <div className="flex items-center gap-2 text-black  text-[14px] sm:text-[19px] mb-5 bg-black/5 sm:mb-5 ">
                  {f.icon}
                  {f.title}
                </div>
                <p className="text-[14px] sm:text-[16px]  text-black/90 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
