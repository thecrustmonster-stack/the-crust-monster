const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      'The Crust Monster booking enquiry',
      '',
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Event date: ${data.get('event_date') || ''}`,
      `Event location: ${data.get('location') || ''}`,
      `Approx. pizzas: ${data.get('pizzas') || ''}`,
      '',
      'Message:',
      data.get('message') || ''
    ];
    const subject = encodeURIComponent('The Crust Monster booking enquiry');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:thecrustmonster@gmail.com?subject=${subject}&body=${body}`;
  });
}
