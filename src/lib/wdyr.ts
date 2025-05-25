'use client';
import React from 'react';

import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true,
  logOwnerReasons: true,
  collapseGroups: true,
  // include: [/./],

  // This is for testing, remove it, if you don't want to log on different values
  logOnDifferentValues: true,
});
