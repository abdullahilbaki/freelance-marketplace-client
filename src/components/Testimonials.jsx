const testimonials = [
  {
    name: "Alice Johnson",
    role: "Freelance Web Developer",
    message:
      "This platform helped me land three new clients in my first week! Super easy to use.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Mark Davis",
    role: "Small Business Owner",
    message:
      "Finding reliable freelancers used to be hard. Now I just post a task and get bids within minutes!",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Mehta",
    role: "Content Writer",
    message:
      "The bidding system makes it easy to find work that matches my skills and budget.",
    avatar: "https://i.pravatar.cc/150?img=28",
  },
  {
    name: "David Park",
    role: "Marketing Consultant",
    message:
      "Impressed by the quality of freelancers here. It’s now my go-to place for outsourcing tasks.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Lina Rodriguez",
    role: "UI/UX Designer",
    message:
      "Posting tasks is super intuitive, and I’ve already completed multiple gigs with great reviews.",
    avatar: "https://i.pravatar.cc/150?img=55",
  },
  {
    name: "Noah Kim",
    role: "SEO Specialist",
    message:
      "Smooth experience from posting a task to receiving high-quality bids. Love the simple interface!",
    avatar: "https://i.pravatar.cc/150?img=64",
  },
  {
    name: "Sara Ahmed",
    role: "eCommerce Store Owner",
    message:
      "I’ve tried many platforms, but none were as straightforward and fast as this one.",
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    name: "James Wu",
    role: "Mobile App Developer",
    message:
      "It’s an ideal platform for freelancers like me looking to fill schedule gaps with quality work.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Fatima Khan",
    role: "Digital Artist",
    message:
      "Clients here truly value creative work. I’ve had repeat commissions within the first month!",
    avatar: "https://i.pravatar.cc/150?img=65",
  },
];

const Testimonials = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8 libre-baskerville">
        What Our Users Say
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="card bg-base-200 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="rounded-full w-24 h-24"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
              <p className="mt-4 text-gray-500 italic">
                "{testimonial.message}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
