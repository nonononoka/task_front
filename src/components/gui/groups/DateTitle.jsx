export const DateTitle = ({ title, fontSize, fontWeight }) => {
    return (
        < Typography
            style={{
                fontSize: fontSize,
                fontWeight: fontWeight,
            }
            }
            gutterBottom
        >
            {title}
        </Typography >
    )
}