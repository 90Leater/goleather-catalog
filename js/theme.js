const themeToggle =
document.getElementById(
'themeToggle'
);

const savedTheme =
localStorage.getItem(
'theme'
);

if(savedTheme === 'dark'){

    document.body.classList.add(
    'dark'
    );

    themeToggle.textContent =
    '☀️ Light Mode';

}
