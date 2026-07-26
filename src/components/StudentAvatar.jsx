import React, { useState } from 'react';

export const StudentAvatar = ({ student, className, initialsClassName, size = 'single' }) => {
  const [hasError, setHasError] = useState(false);
  
  if (!student) return null;

  const imageUrl = student.avatar || student.photoUrl;

  const getInitials = (name) => {
    if (!name) return 'S';
    const cleanName = name.trim();
    if (!cleanName) return 'S';

    if (size === 'single') {
      return cleanName.charAt(0).toUpperCase();
    }

    const parts = cleanName.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  if (imageUrl && !hasError) {
    return (
      <img
        src={imageUrl}
        alt={student.name}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div className={initialsClassName || className}>
      {getInitials(student.name)}
    </div>
  );
};
